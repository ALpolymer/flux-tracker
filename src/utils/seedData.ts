
export function seedData<T>(t: T, key: string) {
    const existing = localStorage.getItem(key);

    if(!existing){
        localStorage.setItem(key, JSON.stringify(t));
    }

}