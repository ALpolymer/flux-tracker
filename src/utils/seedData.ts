
export function seedData<T>(t: T, key:string) {
  localStorage.setItem(key, JSON.stringify(t));
}