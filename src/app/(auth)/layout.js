import { Header } from "@/hader/page"

const AuthLayout = ({children})=>{

return(
<>
<Header/>

<main style={{ padding: '20px' }}> {children} </main>

</>

)
}

export default AuthLayout