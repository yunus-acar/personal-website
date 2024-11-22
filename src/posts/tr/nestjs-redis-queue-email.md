---
title: "Redis Queue ile NestJS'te Email Gönderimi İşlemleri"
date: "2024-11-22"
excerpt: "NestJS ve Redis Queue kullanarak email işlemlerini nasıl kuyruk yapısında gerçekleştirebileceğimizi öğrenin. Yüksek performanslı ve ölçeklenebilir email gönderimi için kapsamlı bir rehber."
category: "backend"
langaugeVersion: "en"
---

Merhaba arkadaşlar! Bugün sizlerle NestJS ve Redis Queue kullanarak nasıl email işlemlerini kuyruk yapısında gerçekleştirebileceğimizi göstereceğim. Bu yaklaşım, özellikle yüksek trafikli uygulamalarda email gönderim işlemlerinin performansını artırmak için oldukça faydalı.

## Redis Queue vs RabbitMQ: Hangisini Seçmeliyiz?

Projeye başlamadan önce, iki popüler message queue çözümü olan Redis Queue ve RabbitMQ arasındaki temel farklara değinmek istiyorum:

### Redis Queue'nun Avantajları:

- **Basit Kurulum**: Redis zaten birçok projede cache olarak kullanıldığı için, ekstra bir servis kurulumuna gerek kalmaz.
- **Hızlı Performans**: In-memory çalıştığı için çok hızlı işlem yapabilir.
- **Kolay Entegrasyon**: Bull kütüphanesi ile NestJS'e entegrasyonu oldukça kolay.
- **Düşük Kaynak Kullanımı**: Lightweight yapısı sayesinde sistem kaynaklarını az kullanır.

### RabbitMQ'nun Avantajları:

- **Kompleks Routing**: Exchange'ler ve binding'ler sayesinde karmaşık message routing senaryolarını destekler.
- **Daha Fazla Message Pattern**: Pub/Sub, Request/Reply, Point-to-Point gibi farklı mesajlaşma modellerini destekler.
- **Persistence**: Mesajları disk üzerinde saklayabilme özelliği vardır.
- **Enterprise Ready**: Büyük ölçekli sistemler için daha uygun olabilir.

### Ne Zaman Hangisini Seçmeliyiz?

- Redis Queue'yu Seçin:

  - Basit ve direkt mesaj kuyruğu ihtiyacınız varsa
  - Zaten Redis kullanıyorsanız
  - Yüksek performans önceliğinizse
  - Email gönderimi gibi basit job'lar için

- RabbitMQ'yu Seçin:
  - Karmaşık routing senaryolarınız varsa
  - Farklı mesajlaşma pattern'leri kullanmanız gerekiyorsa
  - Mesajların disk'te persistence olması kritikse
  - Microservice mimariniz varsa

Bu projede Redis Queue'yu seçmemin nedeni, email gönderimi gibi göreceli basit bir iş için RabbitMQ'nun sunduğu ekstra özelliklere ihtiyacımız olmaması ve Redis'in kurulum ve yönetim açısından daha basit olması.

## Proje Yapısı

Projemizin klasör yapısı şu şekilde:

```
src/
├── app.module.ts
├── queue/
│   ├── queue.module.ts
│   ├── queue.processor.ts
│   ├── queue.service.ts
├── email/
│   ├── email.module.ts
│   ├── email.controller.ts
│   ├── email.service.ts
```

## Gerekli Kurulumlar

Projemize başlamadan önce gerekli paketleri yüklememiz gerekiyor:

```bash
yarn add @nestjs/bull bull nodemailer @nestjs/config
```

## Uygulama Detayları

### 1. Queue Module

Queue modülümüz, Redis bağlantısını ve email kuyruğunu yönetiyor. `BullModule.registerQueueAsync` kullanarak Redis konfigürasyonumuzu yapıyoruz:

```typescript
@Module({
  imports: [
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      name: 'email_queue',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
        },
      }),
    }),
    EmailModule,
  ],
  providers: [QueueService, QueueProcessor],
  exports: [QueueService],
})
```

### 2. Queue Service

Queue Service, email göndermek için kuyruğa yeni görevler ekliyor:

```typescript
@Injectable()
export class QueueService {
  constructor(@InjectQueue("email_queue") private emailQueue: Queue) {}

  async addEmailTask(email: string, subject: string, content: string) {
    await this.emailQueue.add("send_email", { email, subject, content });
    console.log(`Email added to queue: ${email}`);
  }
}
```

### 3. Queue Processor

Queue Processor, kuyruktaki email görevlerini işliyor:

```typescript
@Processor("email_queue")
export class QueueProcessor {
  constructor(private readonly emailService: EmailService) {}

  @Process("send_email")
  async handleEmailTask(job: Job) {
    const { email, subject, content } = job.data;
    try {
      await this.emailService.sendEmail(email, subject, content);
      console.log(`Email successfully sent: ${email}`);
    } catch (error) {
      console.error(`Email sending failed: ${email}`, error);
    }
  }
}
```

### 4. Email Service

Email Service, Nodemailer kullanarak asıl email gönderme işlemini gerçekleştiriyor:

```typescript
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private sender: string;

  constructor(private configService: ConfigService) {
    this.sender = this.configService.get<string>("EMAIL_USER");
    const emailService = this.configService.get<string>("EMAIL_SERVICE");
    const options: SMTPTransport.Options = {
      auth: {
        user: this.configService.get("EMAIL_USER"),
        pass: this.configService.get("EMAIL_PASS"),
      },
    };

    if (emailService) {
      options.service = emailService;
    } else {
      options.host = this.configService.get("EMAIL_HOST");
      options.port = this.configService.get("EMAIL_PORT");
      options.secure = this.configService.get("EMAIL_SECURE") === "true";
    }
    this.transporter = nodemailer.createTransport(options);
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"ME" <${this.sender}>`,
        to,
        subject,
        text: content,
      });
    } catch (error) {
      console.error(`Email sending failed: ${to}`, error);
      throw error;
    }
  }
}
```

### 5. Email Controller

Controller'ımız, email gönderimi için bir endpoint sunuyor:

```typescript
@Controller("email")
export class EmailController {
  constructor(private readonly queueService: QueueService) {}

  @Post("send")
  async sendEmail(
    @Body() body: { email: string; subject: string; content: string },
  ) {
    const { email, subject, content } = body;
    await this.queueService.addEmailTask(email, subject, content);
    return {
      message: "Email sent to queue",
      email,
    };
  }
}
```

## Çevre Değişkenleri

Projenin çalışması için gerekli olan `.env` dosyası örneği:

```
REDIS_HOST=localhost
REDIS_PASSWORD=
REDIS_PORT=6379
EMAIL_HOST=
EMAIL_SERVICE=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
EMAIL_SECURE=
```

## Nasıl Çalışıyor?

1. `/email/send` endpointi üzerinden bir POST isteği geldiğinde, `EmailController` bu isteği alır.
2. Controller, email bilgilerini `QueueService`'e iletir.
3. `QueueService`, bu görevi Redis kuyruğuna ekler.
4. `QueueProcessor`, kuyruktaki görevleri sırayla işler ve `EmailService`'i kullanarak emailleri gönderir.

### Örnek İstek

Email göndermek için aşağıdaki gibi bir HTTP isteği yapabilirsiniz:

```bash
curl --location 'http://localhost:3000/email/send' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "example@domain.dev",
  "subject": "Test Mail",
  "content": "Bu bir test e-postasıdır."
}'
```

### Başarılı Yanıt

```json
{
  "message": "Email sent to queue",
  "email": "example@domain.dev"
}
```

## Neden Queue Kullanmalıyız?

1. **Performans**: Email gönderimi gibi zaman alan işlemler ana uygulamayı bloklamamış olur.
2. **Güvenilirlik**: Kuyruk sistemi sayesinde email gönderim işlemleri kaybolmaz.
3. **Ölçeklenebilirlik**: İhtiyaç durumunda worker sayısını artırarak daha fazla email işlenebilir.
4. **Hata Yönetimi**: Başarısız işlemler otomatik olarak yeniden denenebilir.

## Projeye Erişim

Projenin tüm kaynak kodlarına GitHub üzerinden erişebilirsiniz:

🔗 GitHub Repo: [github.com/yunus-acar/nestjs-redis-queue-email](https://github.com/yunus-acar/nestjs-redis-queue-email)

### Projeyi Lokalde Çalıştırma

```bash
# Repoyu klonlayın
git clone https://github.com/yunus-acar/nestjs-redis-queue-email.git

# Proje dizinine gidin
cd nestjs-redis-queue-email

# Bağımlılıkları yükleyin
yarn

# .env dosyasını oluşturun
cp .env.example .env

# .env dosyasını düzenleyin ve gerekli değişkenleri ayarlayın
nano .env

# Uygulamayı development modunda başlatın
yarn start:dev
```

Projeyi beğendiyseniz GitHub üzerinden ⭐️ vermeyi unutmayın! 😊

İyi kodlamalar! 🚀
