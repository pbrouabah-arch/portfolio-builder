import MinimalTemplate from "./minimal";
import LavenderMemoriesTemplate from "./lavender";

interface TemplateRendererProps {
  template: string;
  data: any;
}

export default function TemplateRenderer({
  template,
  data,
}: TemplateRendererProps) {
  switch (template) {
    case "minimal":
      return <MinimalTemplate data={data} />;

    case "lavender":
      return <LavenderMemoriesTemplate data={data} />;

    default:
      return <MinimalTemplate data={data} />;
  }
}