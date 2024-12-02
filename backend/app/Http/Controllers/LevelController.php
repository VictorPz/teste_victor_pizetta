<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Http\Requests\LevelFormValidator;
use Illuminate\Support\Facades\DB;

class LevelController extends Controller
{
    // Criar um novo nível
    public function store(LevelFormValidator $request)
    {
        $level = Level::create(['nivel' => $request->nivel]);
        return response()->json($level, 201);
    }

    // Listar todos os níveis
    public function listLevels(LevelFormValidator $request)
    {
        //Query por parâmetro
        $searchTerm = $request->input('nivel');

        $query = Level::query();

        if ($searchTerm) {
            $query->where('nivel', 'like', '%' . $searchTerm . '%');
        }

        $level = $query->paginate(10);

        if ($level->isEmpty()) {
            return response()->json(['message' => 'Nenhum nível encontrado'], 400);
        }

        return response()->json([
            'data' => $level->items(),
            'meta' => [
                'total' => $level->total(),
                'per_page' => $level->perPage(),
                'current_page' => $level->currentPage(),
                'last_page' => $level->lastPage(),
            ]
        ], 200);
    }

    // Atualizar um nível existente
    public function updateLevels(LevelFormValidator $request, $id)
    {
        $level = Level::find($id);

        if (!$level) {
            return response()->json(['message' => 'Nível não encontrado'], 400);
        }

        $level->update(['nivel' => $request->nivel]);

        return response()->json($level);
    }

    // Deletar um nível
    public function excludeLevels($id)
    {
        $level = Level::find($id);

        if (!$level) {
            return response()->json(['message' => 'Nível não encontrado'], 400);
        }

        // Verifica se existem desenvolvedores associados ao nível a ser deletado
        if ($level->desenvolvedores()->exists()) {
            return response()->json(['message' => 'Não é possível excluir. Existem desenvolvedores associados a este nível.'], 400);
        }

        $level->delete();

        if ($level::count() == 0) {
            DB::statement('ALTER TABLE niveis AUTO_INCREMENT = 1');
        }

        return response()->json(['message' => 'Nível excluído com sucesso']);
    }

    public function developersCount() {
        //Quantidade de Desenvolvedores associada em um nivel
        $levels = Level::withCount('desenvolvedores')->get();
        return response()->json(['data' => $levels]);
    }
}

