'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';

interface MermaidProps {
  chart: string;
  className?: string;
}

export function Mermaid({ chart, className = '' }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const { theme } = useTheme();

  useEffect(() => {
    // Configure mermaid based on theme
    const isDark = theme === 'dark';

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      fontSize: 16,
      themeVariables: isDark
        ? {
            // Dark theme variables
            background: '#0d1117',
            primaryColor: '#1f6feb',
            primaryTextColor: '#e6edf3',
            primaryBorderColor: '#30363d',
            lineColor: '#6e7681',
            secondaryColor: '#21262d',
            tertiaryColor: '#161b22',
            cScale0: '#0d1117',
            cScale1: '#161b22',
            cScale2: '#21262d',
            cScale3: '#30363d',
            cScale4: '#484f58',
            cScale5: '#6e7681',
            cScale6: '#7d8590',
            cScale7: '#8b949e',
            cScale8: '#b1bac4',
            cScale9: '#c9d1d9',
            cScale10: '#e6edf3',
            cScale11: '#f0f6fc',
          }
        : undefined, // Use default light theme - it was looking good before!
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
      },
      sequence: {
        useMaxWidth: true,
        wrap: true,
      },
      gantt: {
        useMaxWidth: true,
      },
      journey: {
        useMaxWidth: true,
      },
      timeline: {
        useMaxWidth: true,
      },
      gitGraph: {
        useMaxWidth: true,
      },
      c4: {
        useMaxWidth: true,
      },
      sankey: {
        useMaxWidth: true,
      },
      xyChart: {
        useMaxWidth: true,
      },
    });

    const renderChart = async () => {
      if (!chart.trim()) return;

      try {
        // Generate unique ID for this chart
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // Render the chart
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        setSvg(`<div class="text-red-500 p-4 border border-red-300 rounded">
          <p><strong>Mermaid Error:</strong></p>
          <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
          <details class="mt-2">
            <summary class="cursor-pointer">Show chart source</summary>
            <pre class="mt-2 text-sm bg-gray-100 p-2 rounded">${chart}</pre>
          </details>
        </div>`);
      }
    };

    renderChart();
  }, [chart, theme]);

  return (
    <div
      ref={ref}
      className={`mermaid-container my-6 flex justify-center ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// Export a simpler version for direct use in MDX
export function MermaidChart({ children }: { children: string }) {
  return <Mermaid chart={children} />;
}
