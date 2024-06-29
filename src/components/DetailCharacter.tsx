import { getCharacterById, getPlanetByUrl } from "@/services/swapi-services";
import React, { useId } from "react";
import NextImage from "./NextImage";

type TDetailCharacterProps = { id: string };

const DetailCharacter = async (props: TDetailCharacterProps) => {
  const { id } = props;
  const uid = useId();
  const data = await getCharacterById(id);
  const homeworldData = await getPlanetByUrl(data.homeworld);

  return (
    <div className="border border-amber-400 rounded">
      <div className="bg-amber-300 px-2 py-1">
        <h2 className="text-2xl font-[600]">{data.name}</h2>
      </div>
      <div className="flex gap-3 p-2">
        <NextImage
          unoptimized
          src={`${process.env.NEXT_PUBLIC_IMG_URL}/characters/${id}.jpg`}
          height={0}
          width={300}
          className="object-cover h-full min-w-[300px] rounded"
        />
        <div className="flex flex-col min-w-[360px]">
          <h3 className="text-xl text-amber-300 font-[600] mb-2">
            Personal Data
          </h3>
          <ul className="flex flex-col gap-2 mb-4">
            {[
              { label: "Height:", value: `${+data.height / 100} meters` },
              { label: "Mass:", value: `${data.mass} kg` },
              { label: "Birth Year:", value: data.birth_year },
              { label: "Gender:", value: data.gender },
            ].map((item) => (
              <li className="flex items-baseline gap-2" key={uid + item.value}>
                <div className="w-[140px] shrink-0">{item.label}</div>
                <div className="font-[600]">{item.value}</div>
              </li>
            ))}
          </ul>

          <h3 className="text-xl text-amber-300 font-[600] mb-2">HomeWorld</h3>
          <ul className="flex flex-col gap-2">
            {[
              { label: "Name:", value: homeworldData.name },
              {
                label: "Rotation period:",
                value: `${homeworldData.rotation_period} hours`,
              },
              {
                label: "Orbital period:",
                value: `${homeworldData.orbital_period} days`,
              },
              {
                label: "Diameter:",
                value: `${homeworldData.diameter} kilometers`,
              },
              { label: "Climate:", value: homeworldData.climate },
            ].map((item) => (
              <li className="flex items-baseline gap-2" key={uid + item.value}>
                <div className="w-[140px] shrink-0">{item.label}</div>
                <div className="font-[600]">{item.value}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailCharacter;
