import DetailCharacter from "@/components/DetailCharacter";
import { IsLoadingState } from "@/components/api-states/IsLoadingState";
import React, { Suspense } from "react";

type TPageProps = { params: { id: string } };

const Page = (props: TPageProps) => {
  const { params } = props;
  return (
    <Suspense fallback={<IsLoadingState />}>
      <DetailCharacter id={params.id} />
    </Suspense>
  );
};

export default Page;
