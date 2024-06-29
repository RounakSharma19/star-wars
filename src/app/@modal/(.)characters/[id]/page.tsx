import DetailCharacter from "@/components/DetailCharacter";
import { Modal } from "@/components/Modal";
import { IsLoadingState } from "@/components/api-states/IsLoadingState";
import { Suspense } from "react";

type TPageProps = { params: { id: string } };
export default function CharacterModal(props: TPageProps) {
  const { params } = props;
  return (
    <Modal>
      <Suspense fallback={<IsLoadingState />}>
        <DetailCharacter id={params.id} />
      </Suspense>
    </Modal>
  );
}
