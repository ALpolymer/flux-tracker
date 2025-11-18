// export function seedData<T>(arr: T[]) {
//
// }

export function seedUser<T>(user: T, key:string) {
    localStorage.setItem(key, JSON.stringify(user));
}