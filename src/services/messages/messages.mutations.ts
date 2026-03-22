import { useMutation } from "@tanstack/react-query";
import { createMessage } from "./messages.service";

export const useCreateMessageMutation = () => {
  return useMutation({
    mutationFn: createMessage,
  });
};