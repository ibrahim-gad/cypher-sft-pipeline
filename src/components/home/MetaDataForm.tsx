// src/components/home/MetaDataForm.tsx
import usePipelineContext from "../../stores/usePipelineContext";

const MetaDataForm = () => {
    const { domain, subdomain, taxonomyL1, taxonomyL2, scenario, setDomain, setSubdomain, setTaxonomyL1, setTaxonomyL2, setScenario, setStep, step } = usePipelineContext();

    const validateForm = () => {
        return [domain, subdomain, taxonomyL1, taxonomyL2, scenario].every(
            field => field.length >= 5
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(1);
    };

    return (
        <div className="w-full px-4 py-2 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium w-[16.7%]">Domain</label>
                    <input
                        type="text"
                        name="domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="block w-[33.3%] px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                    />
                    <label className="block text-sm font-medium w-[16.7%]">Subdomain</label>
                    <input
                        type="text"
                        name="subdomain"
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value)}
                        className="block w-[33.3%] px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium w-[16.7%]">Taxonomy L1</label>
                    <input
                        type="text"
                        name="taxonomyL1"
                        value={taxonomyL1}
                        onChange={(e) => setTaxonomyL1(e.target.value)}
                        className="block w-[33.3%] px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                    />
                    <label className="block text-sm font-medium w-[16.7%]">Taxonomy L2</label>
                    <input
                        type="text"
                        name="taxonomyL2"
                        value={taxonomyL2}
                        onChange={(e) => setTaxonomyL2(e.target.value)}
                        className="block w-[33.3%] px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div className="flex items-center space-x-1">
                    <label className="block text-sm font-medium w-[16.7%]">Scenario</label>
                    <textarea
                        name="scenario"
                        value={scenario}
                        onChange={(e) => setScenario(e.target.value)}
                        rows={2}
                        className="block w-[83.3%] px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!validateForm() || step != 0}
                        className={`w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${(validateForm() && step == 0) ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MetaDataForm;