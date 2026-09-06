import MinimalTemplate from "./minimal";
import LavenderMemoriesTemplate from "./lavender";
import LightningTemplate from "./lightning";

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
    case "lightning":
      return <LightningTemplate data={data} />;

    default:
      return <MinimalTemplate data={data} />;
  }
}