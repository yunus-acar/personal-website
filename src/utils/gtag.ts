import env from "./get-env";

export const GA_TRACKING_ID = env("NEXT_PUBLIC_GA_ID") as string;

export const pageview = (url: any) => {
  (window as any).gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: any) => {
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
