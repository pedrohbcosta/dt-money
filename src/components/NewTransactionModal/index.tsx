import * as Dialog from "@radix-ui/react-dialog"
import { ArrowCircleDown, ArrowCircleUp, FileDoc, X } from "phosphor-react"
import { Close, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles"
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";


const newTransactionSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type newTransactionInputs = z.infer<typeof newTransactionSchema>

export function NewTransactionModal() {
  const { 
    control,
    register, 
    handleSubmit,
    formState: { isSubmitting }, 
  } = useForm<newTransactionInputs>({
    resolver: zodResolver(newTransactionSchema)
  })

  async function handleCreateNewTransaction(data: newTransactionInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000)) // async/await just to simulate an API request.

    console.log(data)
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        
        <Close>
          <X size={24}/>
        </Close>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input 
            type="text" 
            placeholder="Descrição" 
            required
            {...register('description')}
          />
          <input 
            type="number" 
            placeholder="Preço" 
            required
            {...register('price', { valueAsNumber: true})}
          />
          <input 
            type="text" 
            placeholder="Categoria" 
            required
            {...register('category')}
          />

          <Controller 
            control={control} 
            name="type" 
            render={({ field }) => {
              return(
                <TransactionType onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24}/>
                    Entrada
                  </TransactionTypeButton>
                  
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24}/>
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>

      </Content>
    </Dialog.Portal>
  )
}