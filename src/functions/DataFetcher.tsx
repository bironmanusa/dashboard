import { useEffect, useState } from "react";
import type { OpenMeteoResponse } from "../types/DashboardTypes";

interface DataFetcherOutPut{
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function DataFetcher(lat: number, lon: number): DataFetcherOutPut {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try{
                const response = await fetch(url);
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
                }
                const result: OpenMeteoResponse = await response.json();
                setData(result);
            }catch (err: any){
                if(err instanceof Error) {
                    setError(err.message);
                }else{
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [lat, lon])

    return { data, loading, error };
}