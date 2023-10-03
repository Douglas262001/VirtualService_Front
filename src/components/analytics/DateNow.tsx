import React from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const DateNow: React.FC = () => {
  const formattedDate = format(Date.now(), "EEEE, dd 'de' MMMM", { locale: ptBR });

  return (
    <div>
        <h6 style={{margin: "0px 0px 0px 20px"}} className="text-lg font-bold dark:text-white">{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</h6>
    </div>
  );
};

export default DateNow;