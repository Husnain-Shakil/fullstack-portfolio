import portfolio from "@/data/portfolio.json";
export interface PortfolioType {
  id: number;
  title: string;
  tagline: string;
  image: string;
  cover: string;

  highlights: string[];

  context: string;
  problem: string[];
  solution: string;

  role: string[];

  challenges: {
    title: string;
    description: string;
  }[];

  tech: string[];
  gallery: string[];
}

const getPortfolio = (): PortfolioType[] => {
  return portfolio as PortfolioType[];
};

export default getPortfolio;
