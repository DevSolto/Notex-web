import {LoginForm} from "@/components/loginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Login(){
    return(
        <div className="w-full h-screen flex itens-center justify-center">
        <Card className="my-auto">
            <CardHeader>
                <CardTitle>
                    Login
                </CardTitle>
                <CardDescription>
                    Preencha todos os campos para se autenticar no sistema
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm/>
            </CardContent>
        </Card>
        </div>
    )
}