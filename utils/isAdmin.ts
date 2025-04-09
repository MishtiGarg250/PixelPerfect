export const isAdmin= (user: {role?:string})=>{
    return user.role === "admin";
}