import { useEffect, useState } from "react";
import type { OpenMeteoResponse } from "../types/DashboardTypes";

interface DataFetcherOutPut{
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const CACHE_KEY_PREFIX = "openmeteo_";
const CACHE_TTL_MINUTES = 10; // Vigencia de 10 minutos

function getCacheKey(lat: number, lon: number) {
    return `${CACHE_KEY_PREFIX}${lat}_${lon}`;
}

function isCacheValid(timestamp: number) {
    const now = Date.now();
    return (now - timestamp) < CACHE_TTL_MINUTES * 60 * 1000;
}

export default function DataFetcher(lat: number, lon: number): DataFetcherOutPut {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cacheKey = getCacheKey(lat, lon);
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
            try {
                const { timestamp, response } = JSON.parse(cached);
                if (isCacheValid(timestamp)) {
                    setData(response);
                    setLoading(false);
                    return;
                }
            } catch {
                // Si el cache está corrupto, lo ignoramos
            }
        }

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
                }
                const result: OpenMeteoResponse = await response.json();
                setData(result);
                // Guardar en localStorage con timestamp
                localStorage.setItem(cacheKey, JSON.stringify({
                    timestamp: Date.now(),
                    response: result
                }));
            } catch (err: any) {
                if (cached) {
                    try {
                        const { response } = JSON.parse(cached);
                        setData(response);
                        setError("Mostrando datos almacenados por error de red.");
                    } catch {
                        setError("Ocurrió un error desconocido al obtener los datos.");
                    }
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [lat, lon]);

    return { data, loading, error };
}