
const baseurl = "https://rickandmortyapi.com/api/character/"; 


async function fecthById(id) {
  try {
    const finalurl = baseurl + id;
    const response = await fetch(finalurl);
    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Falha ao buscar dados:", error);
  }
}

// Exemplo de uso:
// fecthById(1);

const ListData = []

for(i = 1; i<10; i++){
    ListData.push(fecthById(i));
}

console.log(ListData);