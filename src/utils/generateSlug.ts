
export const generateSlug = (name: string) => {
    return name
      .toLowerCase() // Convertir a minúsculas
      .replace(/\s+/g, "-") // Reemplazar espacios con guiones
      .replace(/[^\w-]+/g, ""); // Eliminar caracteres no válidos
  };
  