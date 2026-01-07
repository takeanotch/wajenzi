export async function POST(request) {
  try {
    const { login, password } = await request.json()

    // Vérification simple des identifiants
    if (login === 'admin' && password === 'admin') {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Authentification réussie' 
        }), 
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Identifiants incorrects' 
      }), 
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Erreur serveur' 
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}