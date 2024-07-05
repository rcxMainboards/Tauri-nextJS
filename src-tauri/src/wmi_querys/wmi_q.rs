use std::collections::HashMap;
use wmi::*;

struct WMIManager {
    connection: WMIConnection,
}

impl WMIManager {
    fn new() -> Result<Self, WMIError> {
        let com_con = unsafe { COMLibrary::assume_initialized() };
        let wmi_con = WMIConnection::new(com_con.into())?;
        Ok(Self {
            connection: wmi_con,
        })
    }

    fn raw_query(&self, query: &str) -> WMIResult<Vec<HashMap<String, Variant>>> {
        // Ejecutar la consulta y manejar los errores específicos de WMIError
        self.connection.raw_query(query)
    }
}

#[tauri::command]
pub fn wmi_query_class(quey_class: &str) -> Result<String, String> {
    let wmi_manager: WMIManager = match WMIManager::new() {
        Ok(manager) => manager,
        Err(_) => return Err("Error al crear el WMIManager".into()),
    };

    // Ejemplo de uso: consulta inválida
    match wmi_manager.raw_query(quey_class) {
        Ok(results) => {
            if let Some(first_result) = results.get(0) {
                match serde_json::to_string(&first_result) {
                    Ok(json) => Ok(format!("{json}")),
                    Err(e) => Err(format!("Error al convertir a JSON: {e}")),
                }
            } else {
                Err("No se encontraron resultados".into())
            }
        }
        Err(e) => match e {
            WMIError::HResultError { hres } => Err(format!(
                "Error en la consulta, posible consulta invalida: {:#X}",
                hres
            )),
            _ => Err(format!("Error en la consulta: {:?}", e)),
        },
    }
}
