import {
  useQueryStates,
  createParser,
  parseAsString,
  parseAsInteger,
} from "nuqs";

export const optionalIntegerParser = createParser({
  parse: (value: string) => (value ? parseAsInteger.parse(value) : null),
  serialize: (value: number) => (value !== undefined ? String(value) : ""),
});

export const optionalParseAsString = createParser({
  parse: (value: string) => {
    if (value) return parseAsString.parse(value);
    return null;
  },
  serialize: (value: string) => value,
});

export const useFilterStore = () => {
  const [filters, setFilters] = useQueryStates(
    {
      search: optionalParseAsString.withDefault(""),
      page: parseAsInteger.withDefault(1),
      limit: parseAsInteger.withDefault(10),
    },
    {
      shallow: false,
    },
  );

  return {
    filters,
    updateFilters: setFilters,
  };
};
