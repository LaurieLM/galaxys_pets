import useHealth from "../hooks/useHealth";

type GeneralInfoProps = {
    selectedAnimalId: number;
};

export default function GeneralInfo({ selectedAnimalId }: GeneralInfoProps) {

    const {
        data: health,
        isLoading: isLoadingHealth,
        isError: isErrorHealth,
        error: healthError
    } = useHealth(selectedAnimalId);
        
    return (
        <div>
            {selectedAnimalId > 0 && isLoadingHealth && <p className="mt-4 mb-8 text-center font-thin">Chargement des recommandations de santé...</p>}
            {selectedAnimalId > 0 && isErrorHealth && (
                <p className="mt-4 mb-8 text-center text-red-400">Erreur : {(healthError as Error).message}</p>
            )}

            {selectedAnimalId > 0 && health && (
                <div className="mx-4 rounded-2xl border border-emerald-400/25 bg-slate-900/40 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                    <div className="border-b border-emerald-300/15 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-slate-900/0 px-5 py-4">
                        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-emerald-200/70">Suivi santé</p>
                        <h4 className="mt-1 text-[1.05rem] font-semibold text-emerald-100">Recommandations générales</h4>
                        <p className="mt-1 max-w-[34rem] text-sm text-slate-300/85">Informations pour conserver un bon suivi vétérinaire et préventif.</p>
                    </div>

                    <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
                        <article className="rounded-2xl border border-emerald-300/15 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-4">
                            <h5 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-emerald-200/70">Vermifuge</h5>
                            <p className="mt-3 text-sm leading-relaxed text-slate-100">{health.dewormingFrequency}</p>
                        </article>

                        <article className="rounded-2xl border border-emerald-300/15 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-4">
                            <h5 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-emerald-200/70">Contrôle</h5>
                            <p className="mt-3 text-sm leading-relaxed text-slate-100">{health.vetCheckFrequency}</p>
                        </article>

                        <article className="rounded-2xl border border-emerald-300/15 bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-4 sm:col-span-2">
                            <h5 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-emerald-200/70">Conseil</h5>
                            <p className="mt-3 text-sm leading-relaxed text-slate-100/95">{health.generalAdvice}</p>
                        </article>
                    </div>
                </div>
            )}
        </div>
    )
}