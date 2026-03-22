import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "./messages.service";
import { messageKeys } from "./messages.keys";

export const useCreateMessageMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messageKeys.all });
    },
  });
};