import { Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Language } from './interfaces/language.interface';

export interface LanguageSelectorState {
  languages: Language[];
  currentLanguageCode: Language['code'];
}

const LANGUAGES = [
  { code: 'en', displayName: 'English' },
  { code: 'fr', displayName: 'Français' },
  { code: 'de', displayName: 'Deutsch' },
];

const INITIAL_STATE = {
  languages: LANGUAGES,
  currentLanguageCode: 'en',
};

@Injectable()
export class LanguageSelectorStore
  extends ComponentStore<LanguageSelectorState>
  implements OnStoreInit
{
  readonly currentLanguageCode$: Observable<string> = this.select(
    (state) => state.currentLanguageCode
  );

  readonly languages$: Observable<Language[]> = this.select(
    (state) => state.languages
  );

  updateCurrentLanguageCode(currentLanguageCode: string) {
    this.patchState({ currentLanguageCode });
  }

  ngrxOnStoreInit() {
    this.setState(INITIAL_STATE);
  }
}
