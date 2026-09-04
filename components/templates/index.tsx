import MinimalTemplate from "./minimal";

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
    default:
      return <MinimalTemplate data={data} />;
  }
}