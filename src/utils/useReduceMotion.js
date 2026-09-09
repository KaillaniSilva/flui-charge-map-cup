import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Retorna true quando o usuario ativou "Reduzir movimento" no SO.
 * Todos os componentes com motion design consultam este hook e
 * encurtam/desligam animacoes quando ele e true (acessibilidade).
 */
export function useReduceMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((v) => {
      if (mounted) setReduce(!!v);
    });
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', (v) =>
      setReduce(!!v)
    );
    return () => {
      mounted = false;
      sub?.remove?.();
    };
  }, []);

  return reduce;
}
