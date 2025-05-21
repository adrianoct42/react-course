import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

export const metadata = {
  title: "Cabins",
};

// Making a STATIC PAGE into a dynamic page by disabling caching:
// 0 = Totalmente dinâmico (sempre vai buscar dados em qualquer request)
// 15 = Uma vez a cada 15 segundos (precisa se passar 15 segundos no mínimo para ele buscar dados novamente)
// 3600 = Uma checagem por hora (3600 segundos)
// Exemplo: Se um novo dado chegar e revalidate valer 15, mas o usuário atualizar a página
// 11 segundos após o dado anterior ser atualizado, ele ainda mostrará o dado do cache,
// evitando uma busca extra no servidor. O contexto para colocar 0 (puramente dinâmico)
// só faz sentido em aplicações com alto tráfego.
export const revalidate = 30;

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
