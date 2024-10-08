"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Star,
  FileText,
  Send,
  Eye,
  EyeOff,
  FileSearch,
  History,
  Plus,
  FileSpreadsheet,
  FileImage,
  User,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type ChatMessage = {
  role: string;
  content: string;
  user?: string;
  timestamp: string;
};

type ChatSession = {
  id: number;
  date: string;
  title: string;
  messages: ChatMessage[];
};

type FileType = {
  name: string;
  type:
    | "pdf"
    | "doc"
    | "docx"
    | "xls"
    | "xlsx"
    | "png"
    | "jpeg"
    | "txt"
    | "xml";
  size: string;
  summary: string;
};

export default function DetailComponent() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [note, setNote] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [loggedUser, setLoggedUser] = useState("João Silva");
  const [currentSession, setCurrentSession] = useState<ChatSession>({
    id: 1,
    date: new Date().toLocaleString("pt-BR", { hour12: false }),
    title: "Nova Sessão",
    messages: [
      {
        role: "assistant",
        content: "Olá! Como posso ajudar você com esta licitação?",
        timestamp: new Date().toLocaleString("pt-BR", { hour12: false }),
      },
    ],
  });
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(currentSession.title);
  const [lastNoteModification, setLastNoteModification] = useState({
    date: "13/01/2024 10:15:30",
    user: "Carlos Ferreira",
  });
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredFiles, setFilteredFiles] = useState<FileType[]>([]);
  const [inputStats, setInputStats] = useState({
    tokens: 0,
    words: 0,
    characters: 0,
  });
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const files: FileType[] = [
    {
      name: "Edital_001_2024.pdf",
      type: "pdf",
      size: "2.5 MB",
      summary: "Este documento contém as regras e condições da licitação.",
    },
    {
      name: "Anexo_I_Especificacoes.docx",
      type: "docx",
      size: "1.8 MB",
      summary: "Detalhes técnicos e especificações do projeto.",
    },
    {
      name: "Planilha_Orcamentaria.xlsx",
      type: "xlsx",
      size: "500 KB",
      summary: "Planilha com os custos estimados do projeto.",
    },
    {
      name: "Imagem_Local.png",
      type: "png",
      size: "3.2 MB",
      summary: "Fotografia do local onde o projeto será implementado.",
    },
    {
      name: "Dados_Complementares.txt",
      type: "txt",
      size: "50 KB",
      summary: "Informações adicionais sobre o projeto.",
    },
    {
      name: "Estrutura_Projeto.xml",
      type: "xml",
      size: "100 KB",
      summary: "Estrutura do projeto em formato XML.",
    },
  ];

  const getFileIcon = (type: FileType["type"]) => {
    switch (type) {
      case "pdf":
      case "doc":
      case "docx":
      case "txt":
      case "xml":
        return <FileText className="h-4 w-4 mr-2" />;
      case "xls":
      case "xlsx":
        return <FileSpreadsheet className="h-4 w-4 mr-2" />;
      case "png":
      case "jpeg":
        return <FileImage className="h-4 w-4 mr-2" />;
      default:
        return <FileText className="h-4 w-4 mr-2" />;
    }
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        role: "user",
        content: chatMessage,
        user: loggedUser,
        timestamp: new Date().toLocaleString("pt-BR", { hour12: false }),
      };
      setCurrentSession((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));
      setTimeout(() => {
        setCurrentSession((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              role: "assistant",
              content:
                "Entendi sua pergunta. Aqui está uma resposta simulada sobre a licitação.",
              timestamp: new Date().toLocaleString("pt-BR", { hour12: false }),
            },
          ],
        }));
      }, 1000);
      setChatMessage("");
      setInputStats({ tokens: 0, words: 0, characters: 0 });
    }
  };

  const createNewSession = () => {
    if (currentSession.messages.length > 1) {
      setChatSessions((prev) => [...prev, currentSession]);
    }
    const newSession: ChatSession = {
      id: Date.now(),
      date: new Date().toLocaleString("pt-BR", { hour12: false }),
      title: `Nova Sessão ${chatSessions.length + 2}`,
      messages: [
        {
          role: "assistant",
          content: "Olá! Como posso ajudar você com esta licitação?",
          timestamp: new Date().toLocaleString("pt-BR", { hour12: false }),
        },
      ],
    };
    setCurrentSession(newSession);
    setEditedTitle(newSession.title);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    setCurrentSession((prev) => ({ ...prev, title: editedTitle }));
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    }
  };

  const handleNoteSave = () => {
    setLastNoteModification({
      date: new Date().toLocaleString("pt-BR", { hour12: false }),
      user: loggedUser,
    });
  };

  const handleChatInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setChatMessage(text);
    if (text.endsWith("/")) {
      setShowSuggestions(true);
      setFilteredFiles(files);
    } else if (text.includes("/")) {
      const query = text.split("/").pop()?.toLowerCase() || "";
      setFilteredFiles(
        files.filter((file) => file.name.toLowerCase().includes(query))
      );
    } else {
      setShowSuggestions(false);
    }

    // Update input stats
    const words = text.trim().split(/\s+/).length;
    const characters = text.length;
    const estimatedTokens = Math.ceil(words / 0.75);
    setInputStats({ tokens: estimatedTokens, words, characters });
  };

  const handleFileSelect = (file: FileType) => {
    const lastSlashIndex = chatMessage.lastIndexOf("/");
    const newMessage =
      chatMessage.slice(0, lastSlashIndex + 1) + file.name + " ";
    setChatMessage(newMessage);
    setShowSuggestions(false);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex space-y-2"></div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Licitação 001/2024</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Estado:</strong> São Paulo
                </p>
                <p>
                  <strong>Setor:</strong> Tecnologia
                </p>
                <p>
                  <strong>Data Limite:</strong> 15/03/2024
                </p>
                <p>
                  <strong>Status:</strong> Ativa
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Arquivos da Licitação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center">
                      {getFileIcon(file.type)}
                      {file.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{file.size}</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <FileSearch className="h-4 w-4" />
                            <span className="sr-only">Visualizar Resumo</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Resumo do Documento</DialogTitle>
                          </DialogHeader>
                          <p>{file.summary}</p>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm">Baixar</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Anotações</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Adicione suas anotações aqui..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mb-2"
                />
                <div className="flex justify-between items-center">
                  <Button onClick={handleNoteSave}>Salvar Anotações</Button>
                  <p className="text-sm text-gray-500">
                    Última modificação: {lastNoteModification.date} por{" "}
                    {lastNoteModification.user}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Chat Assistente</CardTitle>
                <div className="flex space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={createNewSession}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Nova Sessão</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Nova Sessão</p>
                    </TooltipContent>
                  </Tooltip>
                  <Dialog
                    open={isHistoryModalOpen}
                    onOpenChange={setIsHistoryModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsHistoryModalOpen(true)}
                          >
                            <History className="h-4 w-4" />
                            <span className="sr-only">
                              Histórico de Sessões
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Histórico de Sessões</p>
                        </TooltipContent>
                      </Tooltip>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Histórico de Sessões</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {[...chatSessions, currentSession].map((session) => (
                          <Card key={session.id}>
                            <CardHeader>
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-sm">
                                  {session.title}
                                </CardTitle>
                                <div className="text-xs text-gray-500">
                                  <p>Primeira interação: {session.date}</p>
                                  <p>
                                    Última interação:{" "}
                                    {
                                      session.messages[
                                        session.messages.length - 1
                                      ].timestamp
                                    }
                                  </p>
                                  <p>
                                    Total de mensagens:{" "}
                                    {session.messages.length}
                                  </p>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col pt-6">
                {isEditingTitle ? (
                  <Input
                    value={editedTitle}
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                    onKeyDown={handleTitleKeyDown}
                    className="text-lg font-semibold mb-4"
                  />
                ) : (
                  <h3
                    className="text-lg font-semibold mb-4 cursor-pointer"
                    onClick={handleTitleClick}
                  >
                    {currentSession.title}
                  </h3>
                )}
                <div className="flex-grow space-y-4 mb-4 overflow-y-auto">
                  {currentSession.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg p-2 max-w-[80%] ${
                          msg.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {msg.role === "user" && (
                          <p className="text-xs font-bold mb-1">{msg.user}</p>
                        )}
                        {msg.content}
                        <p className="text-xs mt-1 opacity-70">
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="Digite sua pergunta..."
                    value={chatMessage}
                    onChange={handleChatInputChange}
                    className="resize-none"
                    rows={3}
                  />
                  {showSuggestions && (
                    <div className="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                      <Command>
                        <CommandList>
                          <CommandEmpty>
                            Nenhum documento encontrado.
                          </CommandEmpty>
                          <CommandGroup heading="Documentos">
                            {filteredFiles.map((file) => (
                              <CommandItem
                                key={file.name}
                                onSelect={() => handleFileSelect(file)}
                              >
                                {getFileIcon(file.type)}
                                <span>{file.name}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </div>
                  )}
                  <Button
                    className="absolute bottom-2 right-2"
                    onClick={sendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Tokens: {inputStats.tokens}/4096 | Palavras:{" "}
                  {inputStats.words} | Caracteres: {inputStats.characters}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <footer className="mt-8 text-xs text-gray-500">
          <p>Data e hora de criação: 10/01/2024 14:30:00</p>
          <p>Última visualização: 12/01/2024 09:45:23 por Maria Oliveira</p>
        </footer>
      </div>
    </TooltipProvider>
  );
}
