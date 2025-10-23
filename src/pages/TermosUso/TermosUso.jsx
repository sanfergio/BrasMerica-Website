import React from "react";
import "./TermosUso.css";
import ShortFooter from "../../components/ShortFooter/ShortFooter";

export default function TermosUso() {
    const terms = [
        {
            title: "Termos",
            content: "Ao acessar o website da Brasmerica, você concorda em cumprir e estar vinculado a estes Termos de Uso e a todas as leis e regulamentos aplicáveis. Se você não concordar com qualquer um destes termos, está proibido de usar ou acessar este site. O conteúdo e os materiais contidos neste website são protegidos por leis de direitos autorais e marcas comerciais. Estes Termos de Uso são aplicáveis a todos os usuários do site e a qualquer pessoa que interaja com nossos serviços digitais.",
        },
        {
            title: "Uso de Licença",
            content: "É concedida a permissão para baixar temporariamente uma cópia dos materiais informativos, como textos e imagens de produtos, no website da Brasmerica, exclusivamente para visualização transitória e não comercial. Esta é a concessão de uma licença, e não uma transferência de título, e sob esta licença você não pode modificar ou copiar os materiais para redistribuição pública, usar os materiais para qualquer finalidade comercial, tentar descompilar ou fazer engenharia reversa de qualquer software contido no site, remover quaisquer direitos autorais ou outras notações de propriedade dos materiais, ou transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor. Esta licença será automaticamente rescindida se você violar qualquer uma dessas restrições.",
        },
        {
            title: "Isenção de responsabilidade",
            content: "Os materiais no website da Brasmerica são fornecidos 'como estão', sem garantias explícitas ou implícitas de qualquer tipo. A Brasmerica, em momento algum, garante ou faz representações relativas à precisão, resultados prováveis ou confiabilidade do uso dos materiais em seu site ou de outra forma relacionados a esses materiais ou em quaisquer sites vinculados a este. Não garantimos que o site operará sem interrupções ou erros, ou que quaisquer defeitos serão corrigidos, embora nos esforcemos para manter a melhor experiência de navegação possível.",
        },
        {
            title: "Limitações",
            content: "Em nenhuma circunstância a Brasmerica ou seus fornecedores serão responsáveis por quaisquer danos, incluindo, sem limitação, danos por perda de dados ou lucros, ou devido à interrupção dos negócios, decorrentes do uso ou da incapacidade de usar os materiais no website da Brasmerica. Isso se aplica mesmo que a Brasmerica ou um representante autorizado tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas ou limitações de responsabilidade por danos consequenciais ou incidentais, estas limitações podem não se aplicar a você.",
        },
        {
            title: "Precisão dos materiais",
            content: "Os materiais que aparecem no website da Brasmerica podem incluir erros técnicos, tipográficos ou fotográficos. A Brasmerica não garante que qualquer material em seu website seja preciso, completo ou atual. Poderemos fazer alterações nos materiais contidos no site a qualquer momento, sem aviso prévio. Não assumimos, no entanto, qualquer compromisso de atualizar os materiais. A descrição dos produtos e suas aplicações são fornecidas com a maior precisão possível, mas o usuário final deve sempre confirmar a adequação da peça antes da instalação e uso.",
        },
        {
            title: "Links",
            content: "A Brasmerica não revisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por parte da Brasmerica do site em questão. O uso de qualquer site vinculado é por conta e risco do próprio usuário. É importante notar que sites externos podem ter termos de uso e políticas de privacidade diferentes das nossas.",
        },

    ];

    return (
        <>
            <main className="termos-container">
                <div className="termos-conteudo">
                    <h1 className="termos-titulo">Termos de Uso</h1>
                    <ol className="termos-lista">
                        {terms.map((term, index) => (
                            <li key={index} className="termo-item">
                                <span className="termo-numero">{index + 1}.</span>
                                <div className="termo-textos">
                                    <h2 className="termo-subtitulo">{term.title}</h2>
                                    <p className="termo-descricao">{term.content}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </main>
            <ShortFooter />
        </>
    );
}
