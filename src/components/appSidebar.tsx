const role = localStorage.getItem('user_role');

return (
  <nav className="sidebar">
    {/* Visível apenas para ADMIN */}
    {role === 'ADMIN' && (
      <Link to="/adminPage">Gestão de Usuários</Link>
    )}

    {/* Visível apenas para COORDENADOR */}
    {(role === 'COORDENADOR' || role === 'COORDINATOR') && (
      <>
        <Link to="/coordenadorPage">Painel da Coordenação</Link>
      </>
    )}

    {/* Visível para CLIENTE */}
    {role === 'CLIENTE' && (
      <Link to="/clientePage">Área do Músico</Link>
    )}
  </nav>
);