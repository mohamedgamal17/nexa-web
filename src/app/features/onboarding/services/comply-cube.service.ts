import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ComplyCubeEventData } from "../interfaces/comply-cube-event-data.interface";
declare const ComplyCube: any;
@Injectable({ providedIn: 'root' })
export class ComplyCubeService {

  mount(token: string, containerId: string): Observable<ComplyCubeEventData> {

    return new Observable<ComplyCubeEventData>((observer) => {
      const sdk = ComplyCube;

      const instance = sdk.mount({
        token,
        containerId,
        stages: ['intro', 'documentCapture', 'completion'],
        branding: {
          appearance: {
           
            headingTextColor: 'var(--color-text)',
            subheadingTextColor: 'var(--color-text)',
            bodyTextColor: 'var(--color-text)',

          }
        },
        onComplete: (data: { documentCapture: { documentId: string }, liveVideoId: string }) => {
          instance.updateSettings({ isModalOpen: false });
          observer.next({ type: 'complete', data: { documentId: data.documentCapture.documentId, liveVideoId: data.liveVideoId }, error: null });
          observer.complete();
        },

        onModalClose: () => {
          instance.updateSettings({ isModalOpen: false });
          observer.next({ type: 'closed', data: null, error: null });
        },

        onError: (err: any) => {
          observer.error(err);
        }
      });

      return () => {
        if (instance?.unmount) {
          instance.unmount();
        }
      };
    });
  }
}