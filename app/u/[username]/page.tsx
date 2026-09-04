import { notFound } from "next/navigation";

import TemplateRenderer from "@/components/templates";

import { getPortfolioData } from "@/lib/portfolio";
import { mapPortfolio } from "@/lib/portfolioMapper";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export default async function PublicPortfolio({
  params,
}: Props) {
  const { username } = await params;

  const portfolioData = await getPortfolioData(username);

  if (!portfolioData) {
    notFound();
  }

  const portfolio = mapPortfolio(portfolioData);

  return (
    <TemplateRenderer
      template={portfolioData.profile.template_id}
      data={portfolio}
    />
  );
}