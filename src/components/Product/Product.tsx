import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";


type Product = {
    id: string;
    name: string;

};

export function Product() {
    const data = useLoaderData() as { data: Product };

    return (
        <>
            <Suspense fallback={'Загружаем...'}>
                <Await
                    resolve={data.data}
                >
                    {({ data }: { data: Product }) => (
                        <>Product - {data.name}</>
                    )}
                </Await>

            </Suspense>

        </>
    );
}
