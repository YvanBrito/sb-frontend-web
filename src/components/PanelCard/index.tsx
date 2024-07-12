import { Link } from 'react-router-dom';

interface IPanelCard {
  label: string;
  path: string;
  description: string;
}

const PanelCard: React.FC<IPanelCard> = ({
  label,
  path,
  description,
}: IPanelCard) => {
  return (
    <div className="bg-white p-4 rounded-md">
      <h1 className="font-bold text-lg">{label}</h1>
      <span className="block mb-4">{description}</span>
      <Link className="bg-[#2e729f] p-2 mt-4 rounded-sm text-white" to={path}>
        Acessar
      </Link>
    </div>
  );
};

export { PanelCard };
