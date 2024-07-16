use windows::core::HSTRING;
use windows::Devices::WiFi::{
    WiFiAdapter, WiFiAvailableNetwork, WiFiConnectionResult, WiFiConnectionStatus,
    WiFiNetworkReport, WiFiReconnectionKind,
};
use windows::Foundation::Collections::IVectorView;
use windows::Foundation::IAsyncOperation;
use windows::Security::Credentials::PasswordCredential;



fn find_network_index(
    networks: &IVectorView<WiFiAvailableNetwork>,
    desired_ssid: &str,
) -> Result<u32, String> {
    for i in 0..networks.Size().map_err(|e| e.to_string())? {
        let network = networks.GetAt(i).map_err(|e| e.to_string())?;
        let ssid = network.Ssid().map_err(|e| e.to_string())?;
        if ssid == desired_ssid {
            return Ok(i);
        }
    }
    Err("No se encontro la red objetivo".to_string())
}

async fn connect_to_network(window: tauri::Window) -> Result<String, String> {
    // Suponiendo que FindAllAdaptersAsync retorna un Result con un tipo específico, por ejemplo, Vec<WiFiAdapter>
    let operation: IAsyncOperation<IVectorView<WiFiAdapter>> =
        WiFiAdapter::FindAllAdaptersAsync().map_err(|e| e.to_string())?;

    window.emit("wifi-event", "Consiguiedo Adaptadores de red").unwrap();
    // Convert the IAsyncOperation into a Rust future and await it
    let adapters = operation.get().map_err(|e| e.to_string())?;

    let size = adapters.Size().map_err(|e| e.to_string())?;

    window.emit("wifi-event", format!("Cantidad de Adaptadores de red: {}", size)).unwrap();

    if size >= 1 {
        // Get the main wifi adapter, or the first one
        let main_adapter = adapters.GetAt(0).map_err(|e| e.to_string())?;

        // Get the networks that is currently detecting
        let report: WiFiNetworkReport = main_adapter.NetworkReport().map_err(|e| e.to_string())?;
        let networks: IVectorView<WiFiAvailableNetwork> =
            report.AvailableNetworks().map_err(|e| e.to_string())?;

        //Create Credentials to a network
        let desired_ssid = "TEST-Electron_6G";
        let password_credential = PasswordCredential::new().map_err(|e| e.to_string())?;
        let pass = HSTRING::from("Electron06@");
        password_credential
            .SetPassword(&pass)
            .map_err(|e| e.to_string())?;

        // Find and get the desired network
        let index = find_network_index(&networks, &desired_ssid)?;
        let desired_network = networks.GetAt(index).map_err(|e| e.to_string())?;

        //Connect to the desired network
        let kind = WiFiReconnectionKind::Manual;

        let operation: IAsyncOperation<WiFiConnectionResult> = main_adapter.ConnectWithPasswordCredentialAsync(
            &desired_network,
            kind,
            &password_credential, // Pass a reference to the PasswordCredential
        ).map_err(|e| e.to_string())?;

        let con_result: WiFiConnectionResult = operation.get().map_err(|e| e.to_string())?;
        let con_status: WiFiConnectionStatus = con_result.ConnectionStatus().map_err(|e| e.to_string())?;
        match con_status.0 {
            1 => {     
                // main_adapter.Disconnect().map_err(|e: windows::core::Error| e.to_string())?;
                Ok("Conectado papu".to_string())},
            _ => Err("Ayno".to_string()),
        }
    } else {
        Err("No se encontraron adaptadores de red, no se puede hacer una conexion".to_string())
    }
}

#[tauri::command]
pub async fn test_connection(window: tauri::Window) -> Result<String, String> {
    window.emit("wifi-event", "Iniciando prueba de WIFI").unwrap();
    // Call another async function and wait for it to finish
    match connect_to_network(window).await {
        Ok(v) => Ok(format!("{v}")),
        Err(e) => Err(format!("{e}")),
    }
}
