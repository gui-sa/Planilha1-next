'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { LeadForm } from "./leadForm";
  
export function Intro(){
    return(
        <div className="flex flex-col items-center">
            <h1 className="text-center text-3xl font-bold">
                Bem vindo ao Curso <span className="text-primary">COOKIES BRASILERS</span>
            </h1>
            <p className="mt-3 text-center md:mt-6 lg:mt-8">A escolha que vai te ensinar a fazer: Os cookies mais amados, crocantes por fora e macio por dentro do Brasil</p>
            
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mt-6 md:mt-12 lg:mt-16" variant="secondary">Quero aprender a fazer o melhor cookie do Brasil!</Button>
                </DialogTrigger>
                <DialogContent>
                    <LeadForm/>
                </DialogContent>
            </Dialog>
        </div>
    );
}