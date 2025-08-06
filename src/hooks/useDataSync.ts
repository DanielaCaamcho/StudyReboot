import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { UserData } from '../types';

/**
 * Hook personalizado para sincronizar datos locales con Firebase
 */
export const useDataSync = () => {
  const { user, syncData, getUserData } = useAuth();

  // Sincronizar datos locales con Firebase cuando el usuario inicia sesión
  useEffect(() => {
    if (user) {
      syncLocalDataToCloud();
    }
  }, [user]);

  const syncLocalDataToCloud = async () => {
    try {
      // Obtener datos almacenados localmente
      const localData: Partial<UserData> = {
        studySessions: JSON.parse(localStorage.getItem('studySessions') || '[]'),
        questions: JSON.parse(localStorage.getItem('questions') || '[]'),
        notes: JSON.parse(localStorage.getItem('notes') || '[]'),
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
        calendarEvents: JSON.parse(localStorage.getItem('calendarEvents') || '[]'),
        moodEntries: JSON.parse(localStorage.getItem('moodEntries') || '[]')
      };

      // Verificar si hay datos locales para sincronizar
      const hasLocalData = Object.values(localData).some(data => 
        Array.isArray(data) && data.length > 0
      );

      if (hasLocalData) {
        console.log('Sincronizando datos locales con la nube...');
        await syncData(localData);
        console.log('Datos sincronizados correctamente');
      }

      // Cargar datos de la nube
      await loadCloudData();
    } catch (error) {
      console.error('Error al sincronizar datos:', error);
    }
  };

  const loadCloudData = async () => {
    try {
      console.log('Cargando datos de la nube...');
      const cloudData = await getUserData();
      
      if (cloudData) {
        // Actualizar localStorage con los datos de la nube
        if (cloudData.studySessions) {
          localStorage.setItem('studySessions', JSON.stringify(cloudData.studySessions));
        }
        if (cloudData.questions) {
          localStorage.setItem('questions', JSON.stringify(cloudData.questions));
        }
        if (cloudData.notes) {
          localStorage.setItem('notes', JSON.stringify(cloudData.notes));
        }
        if (cloudData.tasks) {
          localStorage.setItem('tasks', JSON.stringify(cloudData.tasks));
        }
        if (cloudData.calendarEvents) {
          localStorage.setItem('calendarEvents', JSON.stringify(cloudData.calendarEvents));
        }
        if (cloudData.moodEntries) {
          localStorage.setItem('moodEntries', JSON.stringify(cloudData.moodEntries));
        }
        
        console.log('Datos de la nube cargados correctamente');
        
        // Recargar la página para reflejar los datos actualizados
        // Esto es una solución simple, en una app más compleja usarías state management
        window.location.reload();
      }
    } catch (error) {
      console.error('Error al cargar datos de la nube:', error);
    }
  };

  const syncCurrentData = async () => {
    if (!user) return;
    
    try {
      await syncLocalDataToCloud();
    } catch (error) {
      console.error('Error al sincronizar datos:', error);
      throw error;
    }
  };

  return {
    syncCurrentData,
    loadCloudData
  };
};
