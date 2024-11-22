---
title: "Email Processing with Redis Queue in NestJS"
date: "2024-11-22"
excerpt: "Learn how to implement email queue processing using NestJS and Redis Queue. A comprehensive guide for high-performance and scalable email sending."
category: "backend"
langaugeVersion: "tr"
---

Hello everyone! Today, I'll show you how to implement email processing using NestJS and Redis Queue. This approach is particularly useful for improving email sending performance in high-traffic applications.

## Redis Queue vs RabbitMQ: Which One Should We Choose?

Before diving into the project, let's discuss the key differences between two popular message queue solutions, Redis Queue and RabbitMQ:

### Advantages of Redis Queue:

- **Simple Setup**: Since Redis is already used in many projects for caching, no additional service setup is required.
- **High Performance**: Very fast processing due to in-memory operations.
- **Easy Integration**: Simple integration with NestJS using the Bull library.
- **Low Resource Usage**: Uses minimal system resources due to its lightweight structure.

### Advantages of RabbitMQ:

- **Complex Routing**: Supports complex message routing scenarios through exchanges and bindings.
- **Multiple Message Patterns**: Supports different messaging models like Pub/Sub, Request/Reply, Point-to-Point.
- **Persistence**: Ability to store messages on disk.
- **Enterprise Ready**: More suitable for large-scale systems.

### When to Choose Which?

- Choose Redis Queue When:

  - You need simple and direct message queuing
  - You're already using Redis
  - High performance is a priority
  - For simple jobs like email sending

- Choose RabbitMQ When:
  - You have complex routing scenarios
  - You need different messaging patterns
  - Message persistence on disk is critical
  - You have a microservice architecture

For this project, I chose Redis Queue because we don't need the extra features RabbitMQ provides for relatively simple email sending tasks, and Redis is simpler in terms of setup and management.

## Project Structure

Our project structure looks like this:

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

## Required Installations

Before starting, we need to install the necessary packages:

```bash
npm install @nestjs/bull bull nodemailer @nestjs/config
```

## Application Details

### 1. Queue Module

Our Queue module manages Redis connection and email queue. We configure Redis using `BullModule.registerQueueAsync`:

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

Queue Service adds new tasks to the queue for email sending:

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

Queue Processor handles the email tasks in the queue:

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

Email Service handles the actual email sending using Nodemailer:

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

Our controller provides an endpoint for email sending:

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

## Environment Variables

Example `.env` file required for the project:

```
REDIS_HOST=localhost
REDIS_PASSWORD=
REDIS_PORT=6379
EMAIL_HOST=
EMAIL_SERVICE=yandex
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
EMAIL_SECURE=false
```

## How Does It Work?

1. When a POST request comes to the `/email/send` endpoint, `EmailController` handles this request.
2. The controller passes email information to `QueueService`.
3. `QueueService` adds this task to the Redis queue.
4. `QueueProcessor` processes the tasks in the queue and sends emails using `EmailService`.

### Sample Request

You can send an email using an HTTP request like this:

```bash
curl --location 'http://localhost:3000/email/send' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "example@domain.dev",
  "subject": "Test Mail",
  "content": "This is a test email."
}'
```

### Successful Response

```json
{
  "message": "Email sent to queue",
  "email": "example@domain.dev"
}
```

## Why Should We Use Queue?

1. **Performance**: Time-consuming operations like email sending don't block the main application.
2. **Reliability**: Email sending operations won't be lost thanks to the queue system.
3. **Scalability**: You can increase the number of workers when needed to process more emails.
4. **Error Handling**: Failed operations can be automatically retried.

## Accessing the Project

You can access all the source code on GitHub:

🔗 GitHub Repo: [github.com/yunus-acar/nestjs-redis-queue-email](https://github.com/yunus-acar/nestjs-redis-queue-email)

### Running the Project Locally

```bash
# Clone the repository
git clone https://github.com/yunus-acar/nestjs-redis-queue-email.git

# Go to project directory
cd nestjs-redis-queue-email

# Install dependencies
yarn

# Create .env file
cp .env.example .env

# Edit .env file and set required variables
nano .env

# Start the application in development mode
yarn start:dev
```

If you like the project, don't forget to give it a ⭐️ on GitHub! 😊

Happy coding! 🚀
