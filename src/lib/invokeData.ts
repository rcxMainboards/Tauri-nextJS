import { invoke } from "@/lib/tauri";
import wrapPromise from "./wrapPromise";

interface IProcess {
  action: string;
  params?: Record<string, string | number>;
}

function invokeFromRust(process: IProcess) {
  const promise = invoke<string>(process.action, { ...process.params }).then(
    (res) => res,
  );

  return wrapPromise(promise);
}

export default invokeFromRust;
