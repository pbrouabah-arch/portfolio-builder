import LightningTemplate from "./LightningTemplate";

interface LightningTemplateProps {
  data: any;
}

export default function LightningTemplateEntry({
  data,
}: LightningTemplateProps) {
  return <LightningTemplate data={data} />;
}