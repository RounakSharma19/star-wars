import { getCharacterById, getPlanetByUrl } from "@/services/swapi-services";
import React from "react";

type TDetailCharacterProps = { id: string };

const DetailCharacter = async ({ id }: TDetailCharacterProps) => {
  const [data, homeworldData] = await Promise.all([
    getCharacterById(id),
    getPlanetByUrl((await getCharacterById(id)).homeworld),
  ]);

  const personalData = [
    { label: "Height:", value: `${+data.height / 100} meters` },
    { label: "Mass:", value: `${data.mass} kg` },
    { label: "Birth Year:", value: data.birth_year },
    { label: "Gender:", value: data.gender },
  ];

  const homeworldInfo = [
    { label: "Name:", value: homeworldData.name },
    {
      label: "Rotation period:",
      value: `${homeworldData.rotation_period} hours`,
    },
    { label: "Orbital period:", value: `${homeworldData.orbital_period} days` },
    { label: "Diameter:", value: `${homeworldData.diameter} kilometers` },
    { label: "Climate:", value: homeworldData.climate },
  ];

  return (
    <div className="border border-amber-400 rounded">
      <div className="bg-amber-300 px-2 py-1">
        <h2 className="text-2xl font-[600]">{data.name}</h2>
      </div>
      <div className="flex flex-col min-w-[360px] p-2 bg-slate-800">
        <InfoSection title="Personal Data" data={personalData} />
        <InfoSection title="HomeWorld" data={homeworldInfo} />
      </div>
    </div>
  );
};

const InfoSection = ({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: string }[];
}) => (
  <>
    <h3 className="text-xl text-amber-300 font-[600] mb-2">{title}</h3>
    <ul className="flex flex-col gap-2 mb-4">
      {data.map(({ label, value }) => (
        <li className="flex items-baseline gap-2" key={label + value}>
          <div className="w-[140px] shrink-0">{label}</div>
          <div className="font-[600]">{value}</div>
        </li>
      ))}
    </ul>
  </>
);

export default DetailCharacter;
