"use client";

import { TMappedCharacter } from "@/components/CardCharacter";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { XCircle } from "lucide-react";

const FavoriteCharacter = () => {
  const [favorites, setFavorites] = useState<TMappedCharacter[]>([]);

  const loadFavorites = () => {
    const favoritedCharacters: TMappedCharacter[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("favorite-")) {
        const characterData = localStorage.getItem(key);
        if (characterData) {
          favoritedCharacters.push(JSON.parse(characterData));
        }
      }
    }
    console.log("Loaded favorites:", favoritedCharacters);
    setFavorites(favoritedCharacters);
  };

  useEffect(() => {
    loadFavorites();

    window.addEventListener("favoritesChanged", loadFavorites);

    return () => {
      window.removeEventListener("favoritesChanged", loadFavorites);
    };
  }, []);

  const removeFavorite = (character: TMappedCharacter) => {
    localStorage.removeItem(`favorite-${character.id}`);
    loadFavorites();
    window.dispatchEvent(
      new CustomEvent("favoritesChanged", { detail: character })
    );
  };

  if (favorites.length === 0) {
    return <p className="text-white">No favorited characters yet.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {favorites.map((character) => (
        <div
          key={character.id}
          className="flex items-center bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-600 transition-colors text-sm"
        >
          <Link href={`/characters/${character.id}`}>{character.name}</Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              removeFavorite(character);
            }}
            className="ml-2 text-gray-400 hover:text-white"
          >
            <XCircle size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteCharacter;
