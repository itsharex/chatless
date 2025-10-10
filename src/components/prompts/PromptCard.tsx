'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Edit, MoreVertical, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from "@/lib/utils";

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  shortcuts?: string[];
  usageCount: number;
  lastUpdated: string; // e.g., "2小时前更新"
  isFavorite: boolean;
}

interface PromptCardProps extends Prompt {
  onToggleFavorite?: (id: string) => void;
  onApply?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function PromptCard({
  id,
  title,
  description,
  content,
  tags,
  shortcuts = [],
  usageCount,
  lastUpdated,
  isFavorite,
  onToggleFavorite = () => {},
  onApply = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: PromptCardProps) {

  return (
    <div className="prompt-card bg-white/95 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-800/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col">
      {/* 头部 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100/80 dark:border-gray-800/60">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate pr-2" title={title}>{title}</h3>
        <div className="flex items-center gap-1.5">
          <Button
            variant="soft"
            size="sm"
            className="h-7 px-3 text-xs"
            onClick={() => onApply(id)}
          >
            应用
          </Button>
          <button 
            aria-label="收藏" 
            className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-200",
              isFavorite 
                ? "text-amber-500 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30" 
                : "text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            )} 
            onClick={() => onToggleFavorite(id)}
          >
            <Star className={cn("h-4 w-4 transition-transform", isFavorite && "fill-current scale-110")} />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-all duration-200">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={()=>onEdit(id)}>
                <Edit className="h-4 w-4 mr-2" /> 编辑
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={()=>onDelete(id)}>
                <Trash2 className="h-4 w-4 mr-2" /> 删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 主体 */}
      <div className="p-4 flex flex-col gap-3 flex-grow">
        {description ? (
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">{description}</p>
        ) : null}

        {/* 内容预览：使用 line-clamp 提升空间利用 */}
        <div className="rounded-lg bg-gradient-to-br from-slate-50/80 to-gray-50/60 dark:from-gray-800/60 dark:to-slate-800/50 backdrop-blur-sm ring-1 ring-gray-200/60 dark:ring-gray-700/50 px-3 py-2.5 shadow-sm">
          <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-gray-800 dark:text-gray-200 line-clamp-5">{content}</pre>
        </div>

        {/* 标签与快捷键 */}
        <div className="flex items-start justify-between gap-2 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {shortcuts && shortcuts.length > 0 && shortcuts.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="shrink-0 px-1.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-mono border border-amber-200/50 dark:border-amber-700/50"
                title={`/${s}`}
              >
                /{s}
              </Badge>
            ))}
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-2 py-0.5 rounded-full text-[10px] font-medium cursor-default bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 dark:from-gray-800 dark:to-slate-800 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="shrink-0 text-[10px] text-gray-500 dark:text-gray-400 leading-5 whitespace-nowrap font-mono">
            使用 {usageCount} 次 · {lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
} 