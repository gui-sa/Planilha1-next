'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"

export const phoneRegex = new RegExp(
  /^\d{2}\d{9}$/
 );


export function LeadForm() {
  
  const { toast } = useToast()



  const formSchema = z.object({
    name: z.string().min(1,{message:"Por favor, digite seu nome"}),
    email: z.string().email({message:"Por favor, digite um formato email valido"}),
    tel: z.string().regex(phoneRegex, "Por favor, insira um numero valido").optional()

  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  
  const cleanForm = function(){
    form.reset({
      name:"",
      email:"",
      tel: undefined
    })
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
      (async()=>{
        const data = await supabase
        .from('lead')
        .insert({ name: values.name, email: values.email, tel:values.tel });

        if(data.status === 201){
          cleanForm();
          toast({
            title: "Enviado com Sucesso",
            variant: "sucessfull",
            description: "Obrigado pela inscrição!",
          })
        }else if(data.status === 409){
            toast({
              title: "Inscrição não concluida",
              variant: "destructive",
              description: "Esse e-mail e/ou telefone já existem!",
            })
        }
      })();
  }
  return(
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome:*</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite aqui seu nome completo" {...field} />
                  </FormControl>
                  <FormDescription>
                    Exemplo: Guilherme Silva
                  </FormDescription>
                  <FormMessage />
                </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:*</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite aqui seu melhor email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Exemplo: teste@email.com
                  </FormDescription>
                  <FormMessage />
                </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                <FormItem>
                  <FormLabel>Cellphone:</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite aqui seu numero de telefone" {...field} />
                  </FormControl>
                  <FormDescription>
                    Exemplo: (17)91111-1111
                  </FormDescription>
                  <FormMessage />
                </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
          </form>
      </Form>
  );
  }