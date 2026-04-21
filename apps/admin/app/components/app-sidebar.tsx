"use client"

import {
  IconBuildingBank,
  IconChartPie,
  IconChevronLeft,
  IconCreditCardPay,
  IconHelp,
  IconLayoutGrid,
  IconMinus,
  IconReceipt2,
  IconSettings,
  IconWallet,
} from "@tabler/icons-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Banking",
      description: "Central financeira",
      icon: IconWallet,
      sections: [
        {
          title: "Conta",
          items: [
            { title: "Visão geral", url: "#", isActive: true },
            { title: "Saldo e extrato", url: "#" },
            { title: "Transferência", url: "#" },
            { title: "Histórico de transferências", url: "#" },
          ],
        },
        {
          title: "Cobrança",
          items: [
            { title: "Nova cobrança", url: "#" },
            { title: "Histórico de cobrança", url: "#" },
            { title: "Francesinha", url: "#" },
            { title: "Sacados", url: "#" },
          ],
        },
        {
          title: "Pagamento",
          items: [
            { title: "DDA", url: "#" },
            { title: "Novo pagamento", url: "#" },
            { title: "Histórico de pagamentos", url: "#" },
          ],
        },
      ],
    },
    {
      title: "Operações",
      description: "Fluxos e liquidação",
      icon: IconBuildingBank,
      sections: [
        {
          title: "Tesouraria",
          items: [
            { title: "Posição do dia", url: "#" },
            { title: "Conciliação", url: "#" },
            { title: "Liquidações", url: "#" },
          ],
        },
        {
          title: "Arquivos",
          items: [
            { title: "Remessas", url: "#" },
            { title: "Retornos", url: "#" },
          ],
        },
      ],
    },
    {
      title: "Cartões",
      description: "Emissão e limites",
      icon: IconCreditCardPay,
      sections: [
        {
          title: "Gestão",
          items: [
            { title: "Cartões ativos", url: "#" },
            { title: "Solicitações", url: "#" },
            { title: "Limites", url: "#" },
          ],
        },
        {
          title: "Segurança",
          items: [
            { title: "Bloqueios", url: "#" },
            { title: "Alertas", url: "#" },
          ],
        },
      ],
    },
    {
      title: "Relatórios",
      description: "Indicadores e análises",
      icon: IconChartPie,
      sections: [
        {
          title: "Painéis",
          items: [
            { title: "Performance", url: "#" },
            { title: "Recebíveis", url: "#" },
            { title: "Custos", url: "#" },
          ],
        },
      ],
    },
    {
      title: "Cobranças",
      description: "Receitas e faturas",
      icon: IconReceipt2,
      sections: [
        {
          title: "Recebimentos",
          items: [
            { title: "Faturas", url: "#" },
            { title: "Assinaturas", url: "#" },
            { title: "Inadimplência", url: "#" },
          ],
        },
      ],
    },
  ],
  navUtility: [
    { title: "Ajuda", icon: IconHelp, url: "#" },
    { title: "Configurações", icon: IconSettings, url: "#" },
  ],
}

const getDefaultSubItem = (navItem: (typeof data.navMain)[number]) => {
  return (
    navItem.sections
      .flatMap((section) => section.items)
      .find((item) => item.isActive)?.title ?? navItem.sections[0]?.items[0]?.title ?? ""
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState<(typeof data.navMain)[number]>(data.navMain[0])
  const [activeSubItem, setActiveSubItem] = React.useState(getDefaultSubItem(data.navMain[0]))
  const { setOpen } = useSidebar()

  const handleMainItemClick = (item: (typeof data.navMain)[number]) => {
    setActiveItem(item)
    setActiveSubItem(getDefaultSubItem(item))
    setOpen(true)
  }

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden border-r bg-sidebar *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      <Sidebar collapsible="none" className="w-[88px] border-r">
        <SidebarHeader className="items-center px-2 py-4">
          <div className="flex size-11 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <IconLayoutGrid className="size-5" />
          </div>
        </SidebarHeader>

        <SidebarContent className="gap-3 px-2">
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="items-center gap-2">
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title} className="w-full">
                    <SidebarMenuButton
                      tooltip={{ children: item.title, hidden: false }}
                      onClick={() => handleMainItemClick(item)}
                      isActive={activeItem.title === item.title}
                      className="mx-auto size-12 justify-center rounded-lg p-0"
                    >
                      <item.icon className="size-5" />
                      <span className="sr-only">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="mx-auto mt-auto w-10" />

          <SidebarGroup className="p-0 pb-3">
            <SidebarGroupContent>
              <SidebarMenu className="items-center gap-2">
                {data.navUtility.map((item) => (
                  <SidebarMenuItem key={item.title} className="w-full">
                    <SidebarMenuButton
                      render={<a href={item.url} />}
                      tooltip={{ children: item.title, hidden: false }}
                      className="mx-auto size-10 justify-center rounded-lg p-0 text-sidebar-foreground/80"
                    >
                      <item.icon className="size-5" />
                      <span className="sr-only">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="border-b px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-medium tracking-[0.22em] text-sidebar-foreground/60 uppercase">
                {activeItem.title}
              </p>
              <h2 className="text-base font-semibold text-sidebar-foreground">
                {activeItem.description}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-10 items-center justify-center rounded-lg border border-sidebar-ring/40 text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
              aria-label="Collapse sidebar"
            >
              <IconChevronLeft className="size-5" />
            </button>
          </div>
        </SidebarHeader>

        <SidebarContent className="gap-4 px-3 py-4">
          {activeItem.sections.map((section) => (
            <SidebarGroup key={section.title} className="rounded-lg bg-sidebar-accent/35 p-3">
              <div className="flex items-center justify-between rounded-lg bg-sidebar-accent px-4 py-3">
                <h3 className="text-base font-semibold text-sidebar-foreground">
                  {section.title}
                </h3>
                <IconMinus className="size-4 text-sidebar-foreground/70" />
              </div>

              <SidebarGroupContent className="pt-3">
                <SidebarMenuSub className="ml-2 gap-2 border-sidebar-border/80 pr-1">
                  {section.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        render={<a href={subItem.url} />}
                        isActive={activeSubItem === subItem.title}
                        onClick={() => setActiveSubItem(subItem.title)}
                        className="h-10 rounded-lg px-4 text-[15px] text-sidebar-foreground/75"
                      >
                        {subItem.title}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
