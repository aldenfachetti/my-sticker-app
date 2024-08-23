# GIF/Video to WebP Converter

## Descrição

O **GIF/Video to WebP Converter** é uma aplicação full-stack que permite aos usuários converter arquivos de vídeo (como `.mp4`, `.avi`) e imagens animadas (`.gif`) para o formato `.webp`. Este formato é amplamente utilizado por aplicações modernas, como o WhatsApp, que exige o formato `.webp` para seus stickers (figurinhas animadas).

## Funcionalidades

- **Upload de Arquivos**: Os usuários podem fazer upload de arquivos de vídeo e GIFs diretamente da sua máquina.
- **Conversão para WebP**: Os arquivos são convertidos no backend utilizando FFmpeg para garantir alta qualidade de compressão e suporte para animações.
- **Visualização Instantânea**: A imagem convertida é exibida instantaneamente após o processamento.
- **Download Fácil**: Os usuários podem baixar a imagem convertida para sua máquina.
- **Modo Claro/Escuro**: A aplicação suporta alternância entre modo claro e escuro para melhorar a acessibilidade e a experiência do usuário.
- **Responsividade**: A interface é totalmente responsiva, garantindo uma experiência otimizada tanto para dispositivos móveis quanto para desktops.

## Tecnologias Utilizadas

### Frontend

- **[React](https://reactjs.org/)**: Biblioteca JavaScript para construção de interfaces de usuário baseadas em componentes.
- **[Next.js](https://nextjs.org/)**: Framework React para produção, que inclui renderização do lado do servidor e geração de sites estáticos.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utilitário para criação rápida de layouts modernos e responsivos.
- **[Axios](https://axios-http.com/)**: Biblioteca para fazer requisições HTTP no frontend.
- **[React Icons](https://react-icons.github.io/react-icons/)**: Biblioteca de ícones para React.

### Backend

- **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript do lado do servidor.
- **[Express](https://expressjs.com/)**: Framework web minimalista para Node.js.
- **[Multer](https://github.com/expressjs/multer)**: Middleware para manipulação de `multipart/form-data` para upload de arquivos.
- **[FFmpeg](https://ffmpeg.org/)**: Ferramenta poderosa para conversão de vídeo e imagem.
- **[Sharp](https://sharp.pixelplumbing.com/)**: Biblioteca de processamento de imagem de alta performance.
- **[Cors](https://expressjs.com/en/resources/middleware/cors.html)**: Middleware para habilitar CORS na aplicação.

## Como Executar a Aplicação

### Pré-requisitos

- **Node.js**: Versão 18.17.0 ou superior.
- **NPM**: Node Package Manager para gerenciar as dependências.
- **FFmpeg**: Deve estar instalado no sistema para realizar a conversão de mídia. Você pode instalar o FFmpeg [aqui](https://ffmpeg.org/download.html).

### Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seuusuario/webp-image-converter.git
   cd webp-image-converter
   ```

2. **Instale as dependências para o frontend e backend**:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Configure o ambiente**:

   Crie um arquivo `.env` no diretório do backend e adicione variáveis de ambiente, se necessário (por exemplo, configuração de portas, URLs de origem permitidas).

4. **Execute o backend**:

   ```bash
   cd backend
   npm run build
   npm start
   ```

5. **Execute o frontend**:

   ```bash
   cd frontend
   npm run dev
   ```

6. **Acesse a aplicação**:

   Abra seu navegador e vá para [http://localhost:3000](http://localhost:3000).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma **issue** ou enviar um **pull request**.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Agradecimentos

Agradecemos a todos os desenvolvedores e colaboradores de bibliotecas open-source que tornam este projeto possível. Especialmente à equipe do **React**, **Next.js**, **Tailwind CSS**, **FFmpeg**, e **Sharp**.

---

Feito com ❤️ por [Merlin](https://github.com/aldenfachetti).
