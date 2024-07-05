import { invoke } from "@/lib/tauri";
import type { Ilogin } from "@/types/index";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IBaseBoard {
  SerialNumber: string;
}

function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    setFocus,
    clearErrors,
    formState: { errors },
  } = useForm<Ilogin>();

  const validateField = async (
    mappedSerialNumber: string,
  ): Promise<boolean> => {
    try {
      const results = await invoke<string>("wmi_query_class", {
        queyClass: "SELECT SerialNumber FROM Win32_BaseBoard",
      });
      const { SerialNumber } = JSON.parse(results) as IBaseBoard;
      console.log(SerialNumber);
      return mappedSerialNumber !== SerialNumber;
    } catch (e) {
      console.error(e);
      throw e; // rechaza la promesa con el error
    }
  };

  // Con use callback evitamos que la funcion se cree en cada render
  const handleLoginSubmit = async (formData: Ilogin) => {
    try {
      const { ct } = formData;
      const ctMaped = ct.trim().toUpperCase();
      const error = await validateField(ctMaped);
      if (error) {
        setError("ct", {
          message: `El CT ingresado: "${ctMaped}" ingresado no coincide con el de la Mainboard`,
        });
      } else {
        await router.push("/testSelector");
      }
    } catch (err) {
      console.error(err);
      // handle error
    }
  };

  useEffect(() => {
    // Focus al input cuando se monta el componente
    setFocus("ct");
  }, [setFocus]);

  return (
    <section className="flex flex-1">
      <Card className="max-w-[35rem] flex-1 p-5">
        <CardHeader>
          <h1 className="rounded-md text-4xl font-bold tracking-wider">
            Bienvenido a IRR MB
          </h1>
        </CardHeader>
        <CardBody className="mt-4 flex gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(handleLoginSubmit)().catch((err: unknown) => {
                console.error(err);
              });
            }}
          >
            <Input
              maxLength={19}
              isClearable
              variant="underlined"
              isRequired
              label={"CT de computadora"}
              type="text"
              errorMessage={errors.ct?.message}
              isInvalid={Boolean(errors.ct)}
              {...register("ct", { required: "Este campo es requerido" })}
              onClear={() => {
                setValue("numEmployee", "");
                clearErrors();
              }}
            />
            <Input
              maxLength={6}
              isClearable
              variant="underlined"
              isRequired
              label={"Numero de Empleado"}
              type="text"
              errorMessage={errors.numEmployee?.message}
              isInvalid={Boolean(errors.numEmployee)}
              {...register("numEmployee", {
                required: "Este campo es requerido",
              })}
              onClear={() => {
                setValue("numEmployee", "");
              }}
            />
            <section className="mt-6">
              <Button className="w-full" type="submit">
                Iniciar
              </Button>
            </section>
          </form>
        </CardBody>
      </Card>
      <div className="flex flex-1 items-center justify-center">
        <div className="animate-spin">
          <img alt="logo" width={300} height={300} src={"/logo.png"} />
        </div>
      </div>
    </section>
  );
}

export default Login;
