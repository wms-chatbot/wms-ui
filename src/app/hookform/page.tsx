'use client'
import { SubmitHandler, useForm } from "react-hook-form"


type Inputs = {
  example: string
  exampleRequired: string
}


export default function HookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


  console.log(watch("example")) // watch input value by passing the name of it
  console.log(watch("exampleRequired"))

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <main className="p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
            {/* register your input into the hook by invoking the "register" function */}
            <input defaultValue="test" {...register("example")} className="border"/>


            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("exampleRequired", { required: true })} className="border" />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}


            <input type="submit" className="bg-teal-300"/>
        </form>
    </main>
  )
}
