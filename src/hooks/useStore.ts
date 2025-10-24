import { barrakinhaService } from "@/services";
import { GetStoreMeResponse } from "@/services/barrakinha/barrakinha.service.type";
import { wrong } from "@/utils/either";
import { useEffect, useMemo, useState } from "react";

interface StoreMe {
  shortOwnerName: string;
  ownerName: string;
  id: string;
  name: string;
}

export function useStore() {
  const [storeMe, setStoreMe] = useState<StoreMe | null>(null);

  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    const result = await barrakinhaService.getStoreMe();
    if (result.isWrong()) return wrong(result.value);
    setStoreMe({
      ...result.value,
      shortOwnerName: result.value.ownerName.split(" ")[0],
    });
  };

  return {
    storeMe,
    getMe,
  };
}
